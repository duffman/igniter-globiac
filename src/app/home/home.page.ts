import { OnInit }          from "@angular/core";
import { Component }       from '@angular/core';
import { Router }          from "@angular/router";
import { LanguageService } from "@igniter/globiac/language.service";

const log = console.log;
const logErr = console.error;

@Component(
	{
		selector:    'app-home',
		templateUrl: 'home.page.html',
		styleUrls:   ['home.page.scss'],
	})
export class HomePage implements OnInit {
	constructor(private router: Router,
		private langService: LanguageService)
	{
		langService.initLang('se');

		let langRepo: string[];

		langService.getLangData('app.balle').then(res => {
			log('getLangData ::', res);
		}).catch(err => {
			logErr('getLangData ::', err);
		});

		log('HomePage :: Langs ::', langRepo);
	}

	public ngOnInit(): void {
	}

	dynamicData(key: string): void {
		this.router.navigate([''])

	}

	setLang(lang: string): void {
		this.langService.switchLang(lang);
	}
}
