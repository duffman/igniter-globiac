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

import { HttpClient }          from '@angular/common/http';
import { GLog }                from './globiac.logger';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GlobiacSettings }     from './globiac.settings';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
	let loader: TranslateHttpLoader;

	GLog.log('createTranslateLoader ::');
	GLog.log(`Prefix "${GlobiacSettings.dataFilePath}"`);
	GLog.log(`Suffix "${GlobiacSettings.dataFileExt}"`);

	loader = new TranslateHttpLoader(
		http,
		GlobiacSettings.dataFilePath,
		GlobiacSettings.dataFileExt
	);

	return loader;
}
