import type { Translation } from "@i18n/key";

const translation: Translation = {
    header: {
        home: "Home",
        archive: "Archive",
        about: "About",
        friends: "Friends",
    },
    cover: {
        title: {
            home: "This is Youner's Blog",
            archive: "Archive",
            about: "About",
            friends: "Friends",
        },
        subTitle: {
            home: "Cor Cordium",
            archive: "Total of {count} articles",
            about: "A new start",
            friends: "Interesting Souls",
        }
    },
    toc: "Contents",
    category: "Category",
    pageNavigation: {
        previous: "Prev",
        next: "Next",
        currentPage: "Page {currentPage} of {totalPages}",
    },
    button: {
        switchDarkMode: "Switch Dark Mode",
        backToTop: "Back to Top",
        backToBottom: "Back to Bottom",
        meun: "Menu",
        toc: "Contents",
        backToComments: "Back to Comments",
    },
    search: {
        placeholder: "Enter keywords to start searching",
        noresult: "No results found.",
        error: "Search error occurred. Please try again later."
    },
    license: {
        author: "Author",
        license: "License",
        publishon: "Published on"
    },
    blogNavi: {
        next: "Next Blog",
        prev: "Previous Blog"
    },
    pagecard: {
        words: "words",
        minutes: "min read",
        uncategorized: "Uncategorized"
    },
    comments: {
        name: "Name",
        email: "Email",
        site: "Website",
        required: "Required",
        optional: "Optional",
        welcome: "Welcome to comment",
        comments: "Comments",
        cancel: "Cancel",
        send: "Send",
        sending: "Sending...",
        reply: "Reply",
        replyPlaceholder: "Write your reply...",
        loadMore: "Load more",
        loading: "Loading comments...",
        loadFailed: "Failed to load",
        submitSuccess: "Submitted successfully",
        submitFailed: "Submission failed, please try again later",
        fillRequired: "Please fill in name, email and comment content",
        confirmDelete: "Delete this comment and all its replies?",
        delete: "Delete",
        deleteSuccess: "Successfully deleted",
        deleteFailed: "Failed to delete",
        deleteError: "Failed to delete comment",
        noDeletePermission: "This browser does not have permission to delete this comment",
        missingDeleteToken: 'Missing comment ID or delete token',
        commentNotFound: 'Comment not found',
        serverError: 'Server error. Please try again later',
        operationFailed: 'Operation failed. Please try again later',
        characters: "characters",
        words: "words",
        contentTooLong: "Comment content exceeds limit: no more than 2000 characters or 1000 words",
        replyTo: "reply to",
        write: "Write",
        preview: "Preview",
        previewError: "Markdown syntax error",
        codeFence: "Unclosed code block (```)",
        inlineCode: "Unclosed inline code (`)",
        bold: "Bold",
        italic: "Italic",
        quote: "Quote",
        code: "Code",
        link: "Link",
        image: "Image",
        list: "List",
    },
    langNote: {
        note: "Note: ",
        description: "This page does not support English, using the default language version"
    },
    draftNote: {
        warning: "Draft Warning: ",
        description: "This article is a draft and only appears in the testing environment. It will not be displayed in the production environment."
    },
    page404: {
        title: "404 - Void Realm",
        subTitle: "Red panda is upset, but he is just a little red panda.",
        backToHome: "Home",
        backToPreview: "Previous Page",
        errorCode: "Error Code: 404 - Void Realm",
        notice: "Perhaps you can try:"
    },
    themeInfo: {
        light: "Switch to Light Mode",
        dark: "Switch to Dark Mode",
        system: "Switch to System Mode"
    }
}

export default translation;