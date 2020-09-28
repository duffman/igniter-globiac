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

import { Injectable }            from '@angular/core';
import { HttpClient }            from '@angular/common/http';
import { GLog }                  from "@igniter/globiac/globiac.logger";
import { GlobiacSettings }       from "@igniter/globiac/globiac.settings";
import { createTranslateLoader } from "@igniter/globiac/translation-loader";
import { TranslateHttpLoader }   from "@ngx-translate/http-loader";

export interface ILangEntry {
	name: string;
	nativeName: string;
	fileName: string;
}

@Injectable(
	{
		providedIn: 'root'
	})
export class GlobiacLangRepo {
	repository: ILangEntry[];

	constructor(private httpClient: HttpClient) {
		this.repository = new Array<ILangEntry>();
		this.initRepo().then(res => {
			GLog.log('GlobiacLangRepo :: initRepo :: then ::', res);
		});
	}

	/**
	 * This function will always resolve even on an exception
	 * @returns {Promise<boolean>}
	 */
	private initRepo(): Promise<boolean> {
		const s                         = GlobiacSettings;
		let repoUrl                     = `${s.dataFilePath}${s.repoFilename}`;
		let loader: TranslateHttpLoader = createTranslateLoader(this.httpClient);

		return new Promise((resolve) => {
			loader.getTranslation(repoUrl).toPromise().then(res => {
				GLog.log('GlobiacLangRepo :: initRepo ::', res);
				resolve(true);

			}).catch(err => {
				GLog.logErr('GlobiacLangRepo :: initRepo :: err ::', err);
				resolve(false);
			});
		});
	}
}
