import { Document, ValidationError } from 'camo'

export default class Profile extends Document {
  constructor() {
    super()

    this.createdAt = {
      type: Date,
      default: Date.now(),
      required: true,
    }

    this.accountTag = {
      type: String,
    }

    this.us =  {
      type: Object,
    }

    this.eu =  {
      type: Object,
    }

    this.kr =  {
      type: Object,
    }

    this.psn =  {
      type: Object,
    }

    this.xbl =  {
      type: Object,
    }

  }

  static collectionName() {
    return 'profile'
  }

  postValidate() {
  }
}
