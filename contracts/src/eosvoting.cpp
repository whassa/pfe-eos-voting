#include <eosvoting.hpp>

ACTION eosvoting::vote(name from) {
  require_auth(from);

  // Init the _votes table
  votes_table _votes(get_self(), get_self().value);

  // Find the last vote count of user
  auto votes_itr = _votes.find(from.value);
  if (votes_itr == _votes.end()) {
    // Create a vote if it doesnt exist
    _votes.emplace(from, [&](auto& vote_info) {
      vote_info.user = from;
      vote_info.votes = 1;
    });
  } else {
    // add a vote if it exists 
    _votes.modify(votes_itr, from, [&](auto& vote_info) {
      vote_info.votes += 2;
    });
  }
}

ACTION eosvoting::clear() {
  require_auth(get_self());

  votes_table _votes(get_self(), get_self().value);

  // Delete all records in _messages table
  auto votes_itr = _votes.begin();
  while (votes_itr != _votes.end()) {
    votes_itr = _votes.erase(votes_itr);
  }
}

EOSIO_DISPATCH(eosvoting, (vote)(clear))
