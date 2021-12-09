import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity} from './post.entity'
import { AuthGuard } from '@nestjs/passport';
import { PostDto } from './dto/post.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) {}

    @Get()
    async findAll() {
        // get all posts in the db
        return await this.postService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<PostEntity> {
        // find the post with this id
        const post = await this.postService.findOne(id)

        // if the post doesn't exist in the db, throw a 404 error
        if(!post) {
            throw new NotFoundException('This Post doesn\'t exist')
        }

        // if post exist, return the post
        return post
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() post: PostDto, @Request() req): Promise<PostEntity> {
        // create a new post and return the newly created post 
        return await this.postService.create(post, req.user.id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() post: PostDto, @Request() req): Promise<PostEntity> {
        // get the number of row affected and the updated post
        const { numberOfAffectedRows, updatedPost} = await this.postService.update(id, post, req.user.id)

        // if the number of row affected is zero,
        // it mean the post doesn't exist in db
        if(numberOfAffectedRows === 0) {
            throw new NotFoundException('This Post doesnt exist')
        }

        return updatedPost
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the post with this id
        const deleted  = await this.postService.delete(id, req.user.id)

        // if the number of row affected is zero
        // then the post doesnt exist 
        if(deleted === 0) {
            throw new NotFoundException('This post doesnt exist')
        }

        return 'Successfully deleted!'
    }
}
