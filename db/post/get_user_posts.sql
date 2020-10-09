select p.post_id, p.post_url from post p
join meme_user mu on p.user_id = mu.user_id
where mu.user_id = $1;