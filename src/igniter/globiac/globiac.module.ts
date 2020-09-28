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

import { NgModule }              from "@angular/core";
import { HttpClientModule }      from "@angular/common/http";
import { HttpClient }            from "@angular/common/http";
import { TranslateModule }       from "@ngx-translate/core";
import { TranslateLoader }       from "@ngx-translate/core";
import { createTranslateLoader } from "./translation-loader";
import { GlobiacLangRepo }       from "./globiac-lang-repo";

@NgModule(
	{
		declarations: [],
		imports:      [
			HttpClientModule,
			TranslateModule.forRoot(
				{
					loader: {
						provide:    TranslateLoader,
						useFactory: (createTranslateLoader),
						deps:       [HttpClient]
					}
				}
			)
		],
		providers:    [
			GlobiacLangRepo
		],
		bootstrap:    []
	})
export class GlobiacModule {
	constructor() {
	}
}
