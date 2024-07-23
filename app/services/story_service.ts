import RowNotFoundException from '#exceptions/row_not_found_exception'
import Story from '#models/story'
import { StoryCreationPayload, StoryUpdatePayload } from '#types/story'

/**
 * Service that handles stories objects related operations
 */
export default class StoryService {
  /**
   * Entity name as displayed in exception messages
   */
  entityName = 'Story'

  /**
   * Retrieves all stories
   */
  async all() {
    const stories = await Story.all()
    return stories
  }

  /**
   * Retrieves a single story by its ID
   * @param id - The ID of the story to look for
   * @throws - A {@link RowNotFoundException} when no row is found
   */
  async show(id: number) {
    try {
      return await Story.findOrFail(id)
    } catch (error) {
      throw new RowNotFoundException(this.entityName)
    }
  }

  /**
   * Creates a new story
   *
   * @param data - The data to create the new story with
   */
  async store(data: StoryCreationPayload) {
    const story = await Story.create(data)
    return story
  }

  /**
   * Updates an existing story
   *
   * @param story - The story object to update
   * @param data - The data to update the story with
   */
  async update(story: Story, data: StoryUpdatePayload) {
    const updatedStory = await story.merge(data).save()
    return updatedStory
  }

  /**
   * Deletes a story
   *
   * @param story - The story to delete
   */
  async destoy(story: Story) {
    return await story.delete()
  }
}
