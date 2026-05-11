import type {
    SiteConfig,
    ProfileConfig,
    LicenseConfig
} from "./types/config"

import type { FriendLink } from "./types/friend"

export const siteConfig: SiteConfig = {
    title: "Introcepland",
    subTitle: "Blog",

    favicon: "/favicon/favicon.ico", // Path of the favicon, relative to the /public directory

    pageSize: 6, // Number of posts per page
    toc: {
        enable: true,
        depth: 3 // Max depth of the table of contents, between 1 and 4
    },
    blogNavi: {
        enable: true // Whether to enable blog navigation in the blog footer
    },
    comments: {
        enable: true, // Whether to enable comments
        platform: "default", // Comment platform, set "default" to use Momo-backend, also supports "twikoo"
        backendUrl: "https://comment.younerest.com" // Backend URL for comments
    },
    theme: {
        AOS: true, // Whether to enable AOS (Animate On Scroll) for animations
        LQIP: true, // Whether to enable LQIP (Low-Quality Image Placeholder) for image placeholders
        PhotoSwipe: true // Whether to enable PhotoSwipe for image viewer
    }
}

export const profileConfig: ProfileConfig = {
    avatar: "assets/RedPanda.jpg", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
    name: "Youner",
    description: "Cor Cordium",
    indexPage: "https://blog.younerest.com",
    startYear: 2026,
}

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const friendLinkConfig: FriendLink[] = [
    {
        name: 'John River',
        avatar: 'https://blog.nakanashi.com/_astro/avatar.3mjAZgpV_Z1QdH8Q.webp',
        url: 'https://blog.nakanashi.com',
        description: 'パニッシュメント・ディス・ワールド！'
    },
    {
        name: 'Motues',
        avatar: 'https://www.motues.top/avatar.jpg',
        url: 'https://www.motues.top',
        description: 'Like River!'
    }

    // Add more friend links here
]