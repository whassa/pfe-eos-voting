#include <eosvoting.hpp>

ACTION eosvoting::crtproposal(name from, uint64_t primaryKey, string title, string summary, string content, string category, string status) {

  require_auth(from);

  // Init the _votes table
  proposals_table _proposals(get_self(), get_self().value);
  
  auto primary_key_itr = _proposals.find(from.value);

  if (primary_key_itr == _proposals.end()) {
    // Create a vote if it doesnt exist
    _proposals.emplace(get_self(), [&](auto& proposal_info) {
      proposal_info.primaryKey = primaryKey;
      proposal_info.title = title;
      proposal_info.summary = summary;
      proposal_info.content = content;
      proposal_info.category =  category;
      proposal_info.status = status;
      proposal_info.createdAt = 1;
      proposal_info.updatedAt = 1;
      proposal_info.integrity = true;
    });
  } else {
    
  }

};


EOSIO_DISPATCH(eosvoting, (crtproposal));
