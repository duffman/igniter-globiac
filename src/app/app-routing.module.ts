import { NgModule }                                from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundPage }                        from './page-not-found/page-not-found.page';

const routes: Routes = [
	{
		path:        'home',
		loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
	},
	{
		path:        '',
		redirectTo:  'home',
		pathMatch:   'full'
	},
	{
		path:        'language-popover',
		loadChildren: () => import('./pages/language-popover/language-popover.module').then(m => m.LanguagePopoverPageModule)
	},
	{
		path:        'page-not-found',
		loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundPageModule)
	},
	{
		path:        'PathNotFound',
		component:   PageNotFoundPage
	},
	{
		path:        'dynamic',
		loadChildren: () => import('./pages/dynamic-content/dynamic-content.module').then(m => m.DynamicContentPageModule)
	},
	{
		path:        '**',
		redirectTo: 'PathNotFound'
	}
];

@NgModule(
	{
		imports: [
			RouterModule.forRoot(
				routes,
				{
					preloadingStrategy: PreloadAllModules
				})
		],
		exports: [RouterModule]
	})
export class AppRoutingModule {
}
