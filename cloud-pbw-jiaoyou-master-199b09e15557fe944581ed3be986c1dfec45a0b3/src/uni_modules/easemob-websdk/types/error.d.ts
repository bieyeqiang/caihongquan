import { Code } from '../status';
interface ErrorParameters {
	type: Code;
	message: string;
	data?: any;
}
declare class ErrorEvent {
	type: Code;
	message: string;
	data?: any;
}

export type { ErrorParameters, ErrorEvent };
