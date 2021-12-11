import React, { useEffect, useContext, useState } from 'react'
import CreateBlog from '../../Components/HomeComponents/CreateBlog/CreateBlog';
import useFetch from '../../Hooks/useFetch'
import "./CommunityPage.scss"
import mainContext from '../../Context/MainContext';
import axios from "axios";

const CommunityPage = () => {
    
    let blogData = useFetch('https://my-garden-public-data.herokuapp.com/blogs');    
    const context = useContext(mainContext);
    console.log(context.isBlogRefresh)
    const [data, setData] = useState(blogData.data);
    const blogUpdate = context.isBlogRefresh;
    let blogs = data;
    
    useEffect(() => {
        axios.get('https://my-garden-public-data.herokuapp.com/blogs')
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
    }, [blogUpdate])

    return (
        <div className="communityPage">
            <div className="container">
                <CreateBlog />
                    {blogs && blogs.slice(0).reverse().map((blog) => {
                        return (
                            <div className="blog">
                                <div className="blog-head">
                                    <img src={blog.authorImg} alt="" />
                                    <div className="left">    
                                        <div className="title">{blog.title}</div>
                                        <div className="author">Written by: <i>{blog.author}</i></div>
                                    </div>
                                    
                                </div>
                                <div className="content">{blog.body}</div>
                            </div>
                        );
                    })}
            </div>
        </div>
    )
}

export default CommunityPage
