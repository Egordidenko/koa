import pick from 'lodash/pick';
import {User} from '../../users/index';

export default {
  async signUp(ctx) {
    const {_id} = await User.create(pick(ctx.request.body, User.createFields));
    const user = await User.findOneWithPublicFields({_id});

    ctx.body = {data: user};
  },

};
