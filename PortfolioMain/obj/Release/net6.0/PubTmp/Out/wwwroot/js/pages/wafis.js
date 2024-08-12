const mediumArticle = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@parkerbidigare";


$(document).ready(function () {
    $.ajax({
        url: mediumArticle,
        method: "GET",
        dataType: "json",
        success: function (data) {
            const articles = data.items;
            const articlesContainer = $('#articles-row');
            articles.forEach((article, index) => {
                const pubDate = new Date(article.pubDate).toLocaleDateString();
                const html = `
                    <div class="col-lg-4 col-md-4 mb-3">
                        <div class="card" style="width: 20%;">
                            <img src="${article.thumbnail}" class="card-img-top" alt="${article.title}">
                            <div class="card-body">
                                <h5 class="card-title">${article.title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${pubDate}</h6>
                                <a href="${article.link}" class="btn btn-primary">Read More</a>
                            </div>
                        </div>
                    </div>
                `;
                articlesContainer.append(html);
            });
        }
    });
});
