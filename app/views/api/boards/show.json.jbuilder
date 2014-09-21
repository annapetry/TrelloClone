# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list

json.title @board.title
json.user_id @board.user_id
json.board_id @board.id


json.lists @board.lists do |list|
  json.id list.id
  json.title list.title
  json.ord list.ord
  json.cards list.cards do |card|
    json.id card.id
    json.list_id card.list_id
    json.title card.title
    json.ord card.ord
  end
end