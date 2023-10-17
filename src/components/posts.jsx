import React, { useEffect, useState } from "react";
import axios from "axios";
import lodash from 'lodash';

const pageSize = 10;

const Posts = () => {
  const [posts, setPosts ] = useState([]);
  const [paginatedPosts, setPaginatedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos")
    .then(res => {
      console.log(res.data)
      setPosts(res.data);
      setPaginatedPosts(lodash(res.data).slice(0).take(pageSize).value());
    })
  }, []);

  const tam = Math.ceil(posts.length / pageSize);
  const pageCount = posts? tam : 0;

  if(pageCount === 1) {
    return null;
  }

  const pages = lodash.range(1, pageCount + 1)

  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedPost = lodash(posts).slice(startIndex).take(pageSize).value();
    
    setPaginatedPosts(paginatedPost)
  }

  return (
    <>
      <div>
        {
          !paginatedPosts ? ("No data found") : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User ID</th>
                  <th>Title</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  paginatedPosts.map((post, index) => (
                    <tr key={index}>
                      <td>{ post.id }</td>
                      <td>{ post.userId }</td>
                      <td>{ post.title }</td>
                      <td>
                        <p
                          className={
                            post.completed ? "btn btn-success" : "btn btn-danger"
                          }
                        >
                          { post.completed ? "Completed" : "Pending" }
                        </p>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
        }

        <nav className="d-flex justify-content-center">
          <ul className="pagination">
            {
              pages.map((page) => (
                <li class={
                  page === currentPage? "page-item active" : "page-item"
                }>
                  <a class="page-link" href="#"
                    onClick={() => pagination(page)}
                  >
                    { page }
                  </a>
                </li>
              ))
            }

            {/* <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">4</a></li>
            <li class="page-item"><a class="page-link" href="#">5</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li> */}
          </ul>
        </nav>

      </div>
    </>
  )
}

export default Posts;