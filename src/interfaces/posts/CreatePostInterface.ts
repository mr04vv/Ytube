/* eslint-disable camelcase */
export interface CreatePostInterface {
  title: string;
  detail: string;
  start_time: number;
  end_time: number;
  video_url: string;
  game_id: number;
  category_ids: number[];
  is_anonymous: boolean;
}

export interface UpdatePostInterface extends CreatePostInterface {}
