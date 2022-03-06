#include <eosvoting.hpp>

ACTION eosvoting::crtproposal(name from, uint64_t primaryKey, string title, string summary, string content, string category, string status, author author, time_point_sec expiredAt)
{

  require_auth(from);

  // Init the _votes table
  proposals_table _proposals(get_self(), get_self().value);

  auto primary_key_itr = _proposals.find(primaryKey);

  if (primary_key_itr == _proposals.end())
  {
    // Create a vote if it doesnt exist
    time_point_sec time = current_time_point_sec();
    _proposals.emplace(get_self(), [&](auto &proposal_info)
                       {
      proposal_info.title = title;
      proposal_info.summary = summary;
      proposal_info.content = content;
      proposal_info.category =  category;
      proposal_info.status = status;
      proposal_info.expiredAt = expiredAt;
      proposal_info.createdAt = time;
      proposal_info.updatedAt = time;
      proposal_info.integrity = true;
      proposal_info.author = author; });
  }
  else
  {
    _proposals.modify(primary_key_itr, get_self(), [&](auto &proposal_info)
                      {
      proposal_info.primaryKey = primaryKey;
      proposal_info.title = title;
      proposal_info.summary = summary;
      proposal_info.content = content;
      proposal_info.category =  category;
      proposal_info.status = status;
      proposal_info.expiredAt = expiredAt;
      proposal_info.updatedAt = current_time_point_sec();
      proposal_info.integrity = true; });
  }
}

ACTION eosvoting::makevote(name from, uint64_t primaryKey, string publicKey, char value)
{
  require_auth(from);
  // Init the _votes table
  proposals_table _proposals(get_self(), get_self().value);

  auto primary_key_itr = _proposals.find(primaryKey);
  if (primary_key_itr != _proposals.end())
  {
    auto proposals = _proposals.get(primaryKey);
    bool found = 0;
    for (size_t i = 0; i < proposals.votes.vote.size(); i++)
    {
      if (proposals.votes.vote[i].publicKey == publicKey)
      {
        found = 1;
        if (proposals.votes.vote[i].value != value)
        {
          int tmpValue = 0;
          if (proposals.votes.vote[i].value == 1)
          {
            tmpValue = -1;
          }
          else if (proposals.votes.vote[i].value == -1)
          {
            tmpValue = 1;
          }
          _proposals.modify(primary_key_itr, get_self(), [&](auto &proposal_info)
                            {
            proposal_info.votes.actualVote = proposal_info.votes.actualVote + value + tmpValue;
            proposal_info.votes.vote[i].value = value;
            proposal_info.votes.vote[i].updatedAt = current_time_point_sec(); });
        }
        break;
      }
    }

    if (!found)
    {
      time_point_sec time = current_time_point_sec();
      struct vote vote = {time, time, publicKey, value};
      _proposals.modify(primary_key_itr, get_self(), [&](auto &proposal_info)
                        {
        proposal_info.votes.totalVotes = proposal_info.votes.totalVotes + 1;
        proposal_info.votes.actualVote = proposal_info.votes.actualVote + value;
        proposal_info.votes.vote.insert(proposal_info.votes.vote.end(), vote); });
    }
  }
}

ACTION eosvoting::clear()
{
  require_auth(get_self());

  proposals_table _proposals(get_self(), get_self().value);

  // Delete all records in _messages table
  auto msg_itr = _proposals.begin();
  while (msg_itr != _proposals.end())
  {
    msg_itr = _proposals.erase(msg_itr);
  }
}

EOSIO_DISPATCH(eosvoting, (crtproposal)(makevote));
