import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-view-subreddit',
  templateUrl: './view-subreddit.component.html',
  styleUrls: ['./view-subreddit.component.scss']
})
export class ViewSubredditComponent implements OnInit {
  subredditId!: number
  posts!: Array<PostModel> | any

  constructor(private postService: PostService, private activateRoute: ActivatedRoute, private router: Router){
    this.subredditId = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getPostsBySubreddit()
  }

  getPostsBySubreddit(){
    this.postService.getPostsBySubreddit(this.subredditId).subscribe((data: any) =>{
      this.posts = data
      console.log(this.posts);

    }, (error: any) =>{
      throw(error)
    })


  }
}
