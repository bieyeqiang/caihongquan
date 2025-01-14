import * as TranslationTypes from '../types/translation';
import { AsyncResult } from '../types/common';
export interface Translation {
	/**
	 * Gets the list of supported languages for translation.
	 *
	 * ```typescript
	 * connection.getSupportedLanguages()
	 * ```
	 */
	getSupportedLanguages(): Promise<
		AsyncResult<TranslationTypes.SupportLanguage[]>
	>;

	/**
	 * Translates the text.
	 *
	 * ```typescript
	 * connection.translateMessage('hello', 'zh')
	 * ```
	 */
	translateMessage(params: {
		/** The text to be translated. */
		text: string;
		/** The list of target language codes.*/
		languages: string[];
	}): Promise<AsyncResult<TranslationTypes.TranslationResult>>;
}

export { AsyncResult, TranslationTypes };
