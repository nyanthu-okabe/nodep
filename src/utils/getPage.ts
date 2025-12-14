export async function getPage(lang: string, pageName: string) {
	try {
		return await import(`../renderer/pages/${lang}/${pageName}.tsx`);
	} catch (e) {
		throw new Error(`Page not found for ${lang}: ${pageName}`);
	}
}
