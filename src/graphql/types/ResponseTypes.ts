import { ObjectType, Field } from 'type-graphql';
import { Profile, Projects } from '../../entities/Profile';
import { User } from '../../entities/User';

@ObjectType()
export class UserResponse {
	@Field(() => User, { nullable: true })
	user?: User;
}

@ObjectType()
export class ProfileResponse {
	@Field(() => Profile, { nullable: true })
	profile?: Profile;
}

@ObjectType()
export class PagiantionPage {
	@Field()
	page?: number;

	@Field()
	limit?: number;
}

@ObjectType()
export class Pagiantion {
	@Field()
	pages?: number;

	@Field(() => PagiantionPage)
	next?: PagiantionPage;

	@Field(() => PagiantionPage)
	prev?: PagiantionPage;
}

@ObjectType()
export class ProjectsResponse {
	@Field(() => [Projects], { nullable: true })
	projects?: Projects[];

	@Field(() => Pagiantion, { nullable: true })
	pagination?: Pagiantion;
}
