import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from './ai.service';
import { ConfigService } from '@nestjs/config';
import { InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';

// Mock OpenAI
jest.mock('openai');

describe('AiService', () => {
    let service: AiService;
    let configService: ConfigService;
    let mockOpenAI: jest.Mocked<OpenAI>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AiService,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn((key: string) => {
                            if (key === 'AI_API_KEY') return 'gsk_test_api_key';
                            if (key === 'AI_MODEL') return 'llama-3.1-8b-instant';
                            return null;
                        }),
                    },
                },
            ],
        }).compile();

        service = module.get<AiService>(AiService);
        configService = module.get<ConfigService>(ConfigService);
        
        // Get mocked OpenAI instance
        mockOpenAI = (OpenAI as unknown as jest.Mock).mock.instances[0] as jest.Mocked<OpenAI>;
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should validate that generated course has exactly 4 pages', async () => {
        // Mock OpenAI response with valid course structure
        const mockResponse = {
            choices: [{
                message: {
                    content: JSON.stringify({
                        title: 'Test Course',
                        description: 'Test Description',
                        pages: [
                            { title: 'Page 1', content: 'Content 1' },
                            { title: 'Page 2', content: 'Content 2' },
                            { title: 'Page 3', content: 'Content 3' },
                            { title: 'Page 4', content: 'Content 4' }
                        ],
                        questions: [
                            {
                                question_text: 'Question 1',
                                options: [
                                    { option_text: 'A', is_correct: true },
                                    { option_text: 'B', is_correct: false },
                                    { option_text: 'C', is_correct: false }
                                ]
                            },
                            {
                                question_text: 'Question 2',
                                options: [
                                    { option_text: 'A', is_correct: false },
                                    { option_text: 'B', is_correct: true },
                                    { option_text: 'C', is_correct: false }
                                ]
                            }
                        ]
                    })
                }
            }]
        };

        mockOpenAI.chat = {
            completions: {
                create: jest.fn().mockResolvedValue(mockResponse)
            }
        } as any;

        const result = await service.generateCourseContent('Test Subject');
        
        expect(result.pages).toHaveLength(4);
        expect(result.questions).toHaveLength(2);
    });

    it('should validate that generated course has exactly 2 questions', async () => {
        // Similar test but focused on question count
        const mockResponse = {
            choices: [{
                message: {
                    content: JSON.stringify({
                        title: 'Test Course',
                        description: 'Test Description',
                        pages: Array(4).fill({ title: 'Page', content: 'Content' }),
                        questions: [
                            { question_text: 'Q1', options: [{ option_text: 'A', is_correct: true }] },
                            { question_text: 'Q2', options: [{ option_text: 'A', is_correct: true }] }
                        ]
                    })
                }
            }]
        };

        mockOpenAI.chat = {
            completions: {
                create: jest.fn().mockResolvedValue(mockResponse)
            }
        } as any;

        const result = await service.generateCourseContent('Test Subject');
        expect(result.questions).toHaveLength(2);
    });
});
