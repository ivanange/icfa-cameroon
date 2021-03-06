exports.default = [{
        "./src/assets/bundles/js/index.ts": [
            "./src/index.njk",
            "./src/_includes/layouts/base.njk",
            "./src/_includes/contact.njk",
            "./src/_includes/footer.njk",
            "./src/_includes/navbar.njk",
            "./src/_includes/team.njk",
            "./src/_includes/partners.njk",
            "./src/_includes/objectives.njk",
            "./src/_includes/features_articles.njk",
            "./src/_includes/welcome.njk",
        ],
    },
    {
        "./src/assets/bundles/js/about.ts": [
            "./src/about.njk",
            "./src/_includes/layouts/base.njk",
            "./src/_includes/contact.njk",
            "./src/_includes/footer.njk",
            "./src/_includes/navbar.njk",
            "./src/_includes/team.njk",
            "./src/_includes/partners.njk",
            "./src/_includes/welcome.njk",
        ],
    },
    {
        "./src/assets/bundles/js/article.ts": [
            "./src/articles/**.njk",
            "./src/opportunities/**.njk",
            "./src/_includes/layouts/base.njk",
            "./src/_includes/layouts/article.njk",
            "./src/_includes/layouts/articles.njk",
            "./src/_includes/macros/embeds.njk",
            "./src/_includes/footer.njk",
            "./src/_includes/navbar.njk",
            "./src/_includes/articlelist.njk",
            "./src/_includes/opportunity-taglist.njk",
            "./src/_includes/article-taglist.njk",
        ],
    },
]