/**
 * Copyright (C) 2020 Ionic Igniter - ionicigniter.com
 * Author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable }       from '@angular/core';
import { GLog }             from "./globiac.logger";
import { TranslateService } from '@ngx-translate/core';
import { GlobiacLangRepo }  from './globiac-lang-repo';

@Injectable(
	{
		providedIn: 'root'
	})
export class LanguageService {
	constructor(
		private translateService: TranslateService,
		private languageRepo: GlobiacLangRepo
	) {
		const langs = translateService.getLangs();
		console.log('Langs ::', langs);
	}

	public getLangs(): string[] {


		let res: string[] = this.translateService.getLangs();

		if (!res) {
			GLog.log('getLangs :: no lanaguages, creating new array');
			res = new Array<string>();
		} else {
			GLog.logErr('getLangs :: done()');
		}

		return res;
	}

	public setDefaultLang(lang: string): void {
		this.translateService.setDefaultLang(lang);
	}

	public switchLang(lang: string): void {
		this.translateService.use(lang).toPromise().then(res => {
			GLog.log('switchLang :: then :: res ::', res);
		}).catch(err => {
			GLog.logErr('switchLang :: err ::', err);
		});
	}

	/**
	 *
	 * @param {string} lang
	 * @returns {boolean}
	 */
	public initLang(lang?: string): boolean {
		let result = true;

		lang = (!lang)
				   ? this.translateService.getBrowserLang()
				   : lang;

		this.translateService.use(lang).subscribe(
			result => {
				GLog.log('setInitialLang :: lang ::', lang);
			},
			error => {
				GLog.logErr('setInitialLang :: Error :: lang ::', error);
			},
			() => {
				GLog.log('setInitialLang :: completed');
			}
		);

		return result;
	}

	public getLangData(code: string): Promise<string> {
		return new Promise((resolve, reject) => {
			this.translateService.get(code).toPromise().then(res => {
				if (res && typeof res.b64Enc === 'boolean' && res.b64Enc === true) {
					GLog.log('getLangData :: ENCODED ::', res);
				} else {
					GLog.logErr('getLangData :: NOT ENCODED ::', res);
				}

			}).catch(err => {
				GLog.logErr('getLangData :: err ::', err);
				reject(err);
			});
		});
	}
}
