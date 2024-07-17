import { FORBIDDEN_MESSAGE } from '#constants/exception_messages'
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
    if (await bouncer.with(StoryPolicy).denies('show')) {
      return response.forbidden({ message: FORBIDDEN_MESSAGE })
    }
    const stories = await this.storyService.all()
    return response.ok(stories)
  }

  /**
   * Show individual record
   */
  async show({ bouncer, params, response }: HttpContext) {
    if (await bouncer.with(StoryPolicy).denies('show')) {
      return response.forbidden({ message: FORBIDDEN_MESSAGE })
    }
    const story = await this.storyService.findOne(params.id)
    return response.ok(story)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ bouncer, request, response }: HttpContext) {
    if (await bouncer.with(StoryPolicy).denies('store')) {
      return response.forbidden({ message: FORBIDDEN_MESSAGE })
    }
    const payload: StoryCreationPayload = await request.validateUsing(createStoryValidator)
    const story = await this.storyService.create(payload)
    return response.created(story)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ bouncer, params, request, response }: HttpContext) {
    const story = await this.storyService.findOne(params.id)
    if (await bouncer.with(StoryPolicy).denies('update', story)) {
      return response.forbidden({ message: FORBIDDEN_MESSAGE })
    }
    const payload: StoryUpdatePayload = await request.validateUsing(updateStoryValidator)
    const updatedStory = await this.storyService.update(story, payload)
    return response.ok(updatedStory)
  }

  /**
   * Delete record
   */
  async destroy({ bouncer, params, response }: HttpContext) {
    const story = await this.storyService.findOne(params.id)
    if (await bouncer.with(StoryPolicy).denies('delete', story)) {
      return response.forbidden({ message: FORBIDDEN_MESSAGE })
    }
    await this.storyService.delete(story)
    return response.ok(story)
  }
}
