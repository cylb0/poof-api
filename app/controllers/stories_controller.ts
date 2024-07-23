import {
  FORBIDDEN_MESSAGE,
  RESOURCE_CREATION_SUCCESS,
  RESOURCE_DELETE_SUCCESS,
  RESOURCE_FOUND,
  RESOURCE_LIST_FOUND,
  RESOURCE_UPDATE_SUCCESS,
} from '#constants/api_response_messages'
import StoryPolicy from '#policies/story_policy'
import StoryService from '#services/story_service'
import { StoryCreationPayload, StoryUpdatePayload } from '#types/story'
import { createStoryValidator, updateStoryValidator } from '#validators/story'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class StoriesController {
  constructor(protected storyService: StoryService) {}
  /**
   * Display a list of resource
   */
  async index({ bouncer, response }: HttpContext) {
    if (await bouncer.with(StoryPolicy).denies('index')) {
      return response.forbidden({ message: FORBIDDEN_MESSAGE })
    }
    const stories = await this.storyService.all()
    return response.ok({
      message: RESOURCE_LIST_FOUND,
      data: stories,
    })
  }

  /**
   * Show individual record
   */
  async show({ bouncer, params, response }: HttpContext) {
    const story = await this.storyService.show(params.id)
    if (await bouncer.with(StoryPolicy).denies('show', story)) {
      return response.forbidden({ message: FORBIDDEN_MESSAGE })
    }
    return response.ok({
      message: RESOURCE_FOUND,
      data: story,
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ bouncer, request, response }: HttpContext) {
    if (await bouncer.with(StoryPolicy).denies('store')) {
      return response.forbidden({ message: FORBIDDEN_MESSAGE })
    }
    const payload: StoryCreationPayload = await request.validateUsing(createStoryValidator)
    const story = await this.storyService.store(payload)
    return response.created({
      message: RESOURCE_CREATION_SUCCESS,
      data: story,
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ bouncer, params, request, response }: HttpContext) {
    const story = await this.storyService.show(params.id)
    if (await bouncer.with(StoryPolicy).denies('update', story)) {
      return response.forbidden({ message: FORBIDDEN_MESSAGE })
    }
    const payload: StoryUpdatePayload = await request.validateUsing(updateStoryValidator)
    const updatedStory = await this.storyService.update(story, payload)
    return response.ok({
      message: RESOURCE_UPDATE_SUCCESS,
      data: updatedStory,
    })
  }

  /**
   * Delete record
   */
  async destroy({ bouncer, params, response }: HttpContext) {
    const story = await this.storyService.show(params.id)
    if (await bouncer.with(StoryPolicy).denies('destoy', story)) {
      return response.forbidden({ message: FORBIDDEN_MESSAGE })
    }
    await this.storyService.destoy(story)
    return response.ok({
      message: RESOURCE_DELETE_SUCCESS,
      data: story,
    })
  }
}
