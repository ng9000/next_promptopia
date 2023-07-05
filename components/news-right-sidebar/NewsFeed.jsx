import React from "react";

const NewsFeed = () => {
  return (
    <div className="layout__right-sidebar-container">
      <div className="layout__right-sidebar">
        <div className="trends-for-you">
          <div className="trends-for-you__block">
            <div className="trends-for-you__heading">Trends for you</div>
          </div>
          <div className="trends-for-you__block">
            <div className="trends-for-you__meta-information">
              Trending in Germany
            </div>
            <div className="trends-for-you__trend-name">#iPhone12</div>
            <div className="trends-for-you__meta-information">155k Tweets</div>
          </div>
          <div className="trends-for-you__block">
            <div className="trends-for-you__meta-information">
              Trending in Germany
            </div>
            <div className="trends-for-you__trend-name">#AmazonPrimeDay</div>
          </div>
          <div className="trends-for-you__block">
            <div className="trends-for-you__meta-information">
              Trending - Trending
            </div>
            <div className="trends-for-you__trend-name">#autos</div>
            <div className="trends-for-you__meta-information">2,800 Tweets</div>
          </div>
        </div>
        <div className="who-to-follow">
          <div className="who-to-follow__block">
            <div className="who-to-follow__heading">Who to follow</div>
          </div>
          <div className="who-to-follow__block">
            <img
              className="who-to-follow__author-logo"
              src="/assets/images/profile-image-1.jpg"
            />
            <div className="who-to-follow__content">
              <div>
                <div className="who-to-follow__author-name">
                  Becki (&amp; Chris)
                </div>
                <div className="who-to-follow__author-slug">@beckiandchris</div>
              </div>
              <div className="who-to-follow__button">Follow</div>
            </div>
          </div>
          <div className="who-to-follow__block">
            <img
              className="who-to-follow__author-logo"
              src="/assets/images/profile-image-2.png"
            />
            <div className="who-to-follow__content">
              <div>
                <div className="who-to-follow__author-name">Elixir Digest</div>
                <div className="who-to-follow__author-slug">@elixirdigest</div>
              </div>
              <div className="who-to-follow__button">Follow</div>
            </div>
          </div>
          <div className="who-to-follow__block">
            <img
              className="who-to-follow__author-logo"
              src="/assets/images/profile-image-3.jpg"
            />
            <div className="who-to-follow__content">
              <div>
                <div className="who-to-follow__author-name">Chris Martin</div>
                <div className="who-to-follow__author-slug">@chris_martin</div>
              </div>
              <div className="who-to-follow__button">Follow</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
