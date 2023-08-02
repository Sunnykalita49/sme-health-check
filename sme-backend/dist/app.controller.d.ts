import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    submitData(file: any, body: any): Promise<{
        success: boolean;
        message: string;
        fileName: string;
    }>;
}
