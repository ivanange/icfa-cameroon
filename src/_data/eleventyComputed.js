module.exports = {
    navlinks: data => (data.links || []).map(link => ({
        data: {
            eleventyNavigation: link,
            url: data.page.url + link.url
        }
    })),
};