import { ObjectType, Field, ID } from 'type-graphql';
import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './User';
import { Position } from './Position';

@ObjectType()
class Member {
	@Field(() => User)
	@prop({ type: () => User, ref: () => User, required: true })
	dev!: Ref<User>;

	@Field()
	@prop({ required: true })
	title!: string;

	@Field(() => [String])
	@prop({ type: () => [String], required: true })
	skills!: string[];
}

@ObjectType()
class Applicant {
	@Field(() => User)
	@prop({ type: () => User, ref: () => User, required: true })
	dev!: Ref<User>;

	@Field(() => Position)
	@prop({ type: () => Position, ref: () => Position, required: true })
	position!: Ref<Position>;

	@Field()
	@prop({ default: false })
	read?: boolean;
}

@ObjectType()
class Offered {
	@Field(() => User)
	@prop({ type: () => User, ref: () => User, required: true })
	dev!: Ref<User>;

	@Field(() => Position)
	@prop({ type: () => Position, ref: () => Position, required: true })
	position!: Ref<Position>;
}

@ObjectType()
class Task {
	@Field(() => [User])
	@prop({ type: () => [User], ref: () => User, required: true })
	devs!: Ref<User>[];

	@Field()
	@prop({ trim: true, required: [true, 'please add a title'] })
	title!: string;

	@Field()
	@prop({
		trim: true,
		minlength: 50,
		required: [true, 'please add a description'],
	})
	description!: string;

	@Field({ nullable: true })
	@prop({
		trim: true,
		minlength: 10,
	})
	note?: string;

	@Field()
	@prop({ default: 'TODO' })
	status?: string;

	@Field()
	@prop({ default: Date.now })
	startDate?: Date;

	@Field({ nullable: true })
	@prop()
	dueDate?: Date;

	@Field()
	@prop({ default: false })
	read?: boolean;
}

@ObjectType()
class Comment {
	@Field(() => User)
	@prop({ type: () => User, ref: () => User, required: true })
	user!: Ref<User>;

	@Field()
	@prop({
		trim: true,
		minlength: 50,
		required: [true, 'please add comment text'],
	})
	text!: string;

	@Field()
	@prop({ default: Date.now })
	date?: Date;
}

@ObjectType()
class Post {
	@Field(() => User)
	@prop({ type: () => User, ref: () => User, required: true })
	user!: Ref<User>;

	@Field()
	@prop({ trim: true, required: [true, 'please add a post title'] })
	title!: string;

	@Field()
	@prop({
		trim: true,
		minlength: 50,
		required: [true, 'please add a post body'],
	})
	text!: string;

	@Field(() => [Comment], { nullable: true })
	@prop({ type: () => [Comment] })
	comments?: Comment[];

	@Field()
	@prop({ default: Date.now })
	date?: Date;
}

@ObjectType()
export class Project {
	@Field(() => ID)
	id!: string;

	@Field(() => User)
	@prop({ type: () => User, ref: () => User, required: true })
	owner!: Ref<User>;

	@Field()
	@prop({ trim: true, required: [true, 'please add a project title'] })
	title!: string;

	@Field()
	@prop({
		trim: true,
		minlength: 50,
		maxlength: 1000,
		required: [true, 'please add a project description'],
	})
	description!: string;

	@Field()
	@prop({ default: false })
	closed?: boolean;

	@Field(() => [Position], { nullable: true })
	@prop({
		ref: () => Position,
		type: () => [Position],
		_id: false,
	})
	openings?: Ref<Position>[];

	@Field(() => [Member], { nullable: true })
	@prop({ type: () => [Member], _id: false })
	members?: Member[];

	@Field(() => [Member], { nullable: true })
	@prop({ type: () => [Member], _id: false })
	previousMembers?: Member[];

	@Field(() => [Applicant], { nullable: true })
	@prop({ type: () => [Applicant], _id: false })
	applicants?: Applicant[];

	@Field(() => [Offered], { nullable: true })
	@prop({ type: () => [Offered], _id: false })
	offered?: Offered[];

	@Field(() => [Task], { nullable: true })
	@prop({ type: () => [Task] })
	tasks?: Task[];

	@Field(() => [Post], { nullable: true })
	@prop({ type: () => [Post] })
	posts?: Post[];
}

export const ProjectModel = getModelForClass(Project);