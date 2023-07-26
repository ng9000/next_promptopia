import Explore from '@/components/feed/explore'
import Sidebar from '@/components/nav-sidebar/sidebar'
import NewsFeed from '@/components/news-right-sidebar/NewsFeed'
import React from 'react'

const ExplorePage = () => {
    return (
        <section className="layout prevent-select">
            <Sidebar active="explore" />
            <Explore />
            <NewsFeed />
        </section>
    )
}

export default ExplorePage