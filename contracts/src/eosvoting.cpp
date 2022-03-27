#include <eosvoting.hpp>



ACTION eosvoting::crtproposal(name from, string title, string summary, string content, string category, uint64_t voteMargin, string status, std::vector<name> whitelist, time_point_sec expiredAt)
{

  require_auth(from);

  // Init the _votes table
  proposals_index _proposals(get_self(), get_self().value);
  // Create a vote if it doesnt exist
  time_point_sec time = current_time_point_sec();

  _proposals.end();

  _proposals.emplace(get_self(), [&](auto &proposal_info)
                     {
      proposal_info.primaryKey = _proposals.available_primary_key();
      proposal_info.title = title;
      proposal_info.summary = summary;
      proposal_info.content = content;
      proposal_info.category =  category;
      proposal_info.voteMargin = voteMargin;
      proposal_info.status = status;
      proposal_info.expiredAt = expiredAt;
      proposal_info.createdAt = time;
      proposal_info.updatedAt = time;
      proposal_info.whitelist = whitelist;
      proposal_info.author = from; });
}

ACTION eosvoting::upproposal(name from, uint64_t primaryKey, string title, string summary, string content, string category, uint64_t voteMargin, string status, time_point_sec expiredAt)
{
  require_auth(from);

  // Init the _votes table
  proposals_index _proposals(get_self(), get_self().value);

  auto primary_key_itr = _proposals.find(primaryKey);

  if (primary_key_itr != _proposals.end())
  {
    auto proposals = _proposals.get(primaryKey);

    check(proposals.author == name(from), "You can't change the information if you're not the owner");
    _proposals.modify(primary_key_itr, get_self(), [&](auto &proposal_info)
      {
      proposal_info.primaryKey = primaryKey;
      proposal_info.title = title;
      proposal_info.summary = summary;
      proposal_info.content = content;
      proposal_info.category =  category;
      proposal_info.voteMargin = voteMargin;
      proposal_info.status = status;
      proposal_info.expiredAt = expiredAt;
      proposal_info.updatedAt = current_time_point_sec(); });
  }
}

ACTION eosvoting::makevote(name from, uint64_t primaryKey, char value)
{
  require_auth(from);
  // Init the _votes table
  proposals_index _proposals(get_self(), get_self().value);

  auto primary_key_itr = _proposals.find(primaryKey);
  if (primary_key_itr != _proposals.end())
  {
    auto proposals = _proposals.get(primaryKey);
    bool found = 0;
    
    bool whitelisted = checkwhitelist(proposals.whitelist, from, proposals.author);
    // Else everyone can vote
    check(whitelisted == 1, "You can't vote if you're not on the whitelist. Ask the owner to change it.");

    for (size_t i = 0; i < proposals.votes.vote.size(); i++)
    {
      if (proposals.votes.vote[i].user == from)
      {
        found = 1;
        int tmpValue = 0;
        if (proposals.votes.vote[i].value != value)
        {
          if (proposals.votes.vote[i].value == 1)
          {
            tmpValue = -1;
          }
          else if (proposals.votes.vote[i].value == -1)
          {
            tmpValue = 1;
          }
        }
        _proposals.modify(primary_key_itr, get_self(), [&](auto &proposal_info)
                          {
          proposal_info.votes.actualVote = proposal_info.votes.actualVote + value + tmpValue;
          proposal_info.votes.vote[i].value = value;
          proposal_info.votes.vote[i].updatedAt = current_time_point_sec(); });
        break;
      }
    }

    if (!found)
    {
      time_point_sec time = current_time_point_sec();
      struct vote vote = {time, time, from, value};
      _proposals.modify(primary_key_itr, get_self(), [&](auto &proposal_info)
                        {
        proposal_info.votes.totalVotes = proposal_info.votes.totalVotes + 1;
        proposal_info.votes.actualVote = proposal_info.votes.actualVote + value;
        proposal_info.votes.vote.insert(proposal_info.votes.vote.end(), vote); });
    }
  }
}

ACTION eosvoting::crtargument(name from, uint64_t primaryKey, string title, string content, bool value)
{

  require_auth(from);
  // Init the _votes table
  proposals_index _proposals(get_self(), get_self().value);

  auto primary_key_itr = _proposals.find(primaryKey);

  if (primary_key_itr != _proposals.end())
  {

    auto proposal = _proposals.get(primaryKey);

    bool whitelisted = checkwhitelist(proposal.whitelist, from, proposal.author);
    // Else everyone can vote
    check(whitelisted == 1, "You can't create an argument if you're not on the whitelist. Ask the owner to change it.");

    // Generate the primary key based on other primary key
    uint64_t primaryKey = 0;
    for (size_t i = 0; i < proposal.arguments.argument.size(); i++)
    {
      if (primaryKey <= proposal.arguments.argument[i].primaryKey)
      {
        primaryKey = proposal.arguments.argument[i].primaryKey + 1;
      }
    }

    time_point_sec time = current_time_point_sec();

    struct argument argument = {primaryKey, title, content, from, time, time};
    argument.value = value;
    _proposals.modify(primary_key_itr, get_self(), [&](auto &proposal_info)
                      { proposal_info.arguments.argument.insert(proposal_info.arguments.argument.end(), argument); });
  }
}

ACTION eosvoting::voteargument(name from, uint64_t primaryKey, uint64_t argumentKey, char value)
{
  require_auth(from);
  // Init the _votes table
  proposals_index _proposals(get_self(), get_self().value);

  auto primary_key_itr = _proposals.find(primaryKey);
  if (primary_key_itr != _proposals.end())
  {
    auto proposals = _proposals.get(primaryKey);
    
    bool whitelisted = checkwhitelist(proposals.whitelist, from, proposals.author);
    // Else everyone can vote
    check(whitelisted == 1, "You can't vote on an argument if you're not on the whitelist. Ask the owner to change it.");


    bool found = 0;
    for (size_t i = 0; i < proposals.arguments.argument.size(); i++)
    {
      if (proposals.arguments.argument[i].primaryKey == argumentKey)
      {
        found = 1;
        bool foundVote = 0;
        for (size_t j = 0; j < proposals.arguments.argument[i].votes.vote.size(); j++)
        {
          if (proposals.arguments.argument[i].votes.vote[j].user == from)
          {
            foundVote = 1;
            int tmpValue = 0;
            if (proposals.arguments.argument[i].votes.vote[j].value != value)
            {
              if (proposals.arguments.argument[i].votes.vote[j].value == 1)
              {
                tmpValue = -1;
              }
              else if (proposals.arguments.argument[i].votes.vote[j].value == -1)
              {
                tmpValue = 1;
              }
            }
            _proposals.modify(primary_key_itr, get_self(), [&](auto &proposal_info)
                              {
            proposal_info.arguments.argument[i].votes.actualVote = proposal_info.arguments.argument[i].votes.actualVote + value + tmpValue;
            proposal_info.arguments.argument[i].votes.vote[j].value = value;
            proposal_info.arguments.argument[i].votes.vote[j].updatedAt = current_time_point_sec(); });
            break;
          }
        }
        if (!foundVote)
        {
          time_point_sec time = current_time_point_sec();
          struct vote vote = {time, time, from, value};
          _proposals.modify(primary_key_itr, get_self(), [&](auto &proposal_info)
                            {
            proposal_info.arguments.argument[i].votes.totalVotes = proposal_info.arguments.argument[i].votes.totalVotes + 1;
            proposal_info.arguments.argument[i].votes.actualVote = proposal_info.arguments.argument[i].votes.actualVote + value;
            proposal_info.arguments.argument[i].votes.vote.insert(proposal_info.arguments.argument[i].votes.vote.end(), vote); });
        }
        // Vote not found in argument
        break;
      }
    }
    if (!found)
    {
      // Not found
    }
  }
}

ACTION eosvoting::crtnews(name from, uint64_t primaryKey, string title, string content)
{
  require_auth(from);
  // Init the _votes table
  proposals_index _proposals(get_self(), get_self().value);

  auto primary_key_itr = _proposals.find(primaryKey);

  if (primary_key_itr != _proposals.end())
  {
    auto proposals = _proposals.get(primaryKey);
    check(proposals.author == name(from), "You can't change the information if you're not the owner");
    time_point_sec time = current_time_point_sec();

    struct singlenews singleNews = {title, content, time, time};
    _proposals.modify(primary_key_itr, get_self(), [&](auto &proposal_info)
                      { proposal_info.news.singlenews.insert(proposal_info.news.singlenews.end(), singleNews); });
  }
}

ACTION eosvoting::clear()
{
  require_auth(get_self());

  proposals_index _proposals(get_self(), get_self().value);

  // Delete all records in _messages table
  auto msg_itr = _proposals.begin();
  while (msg_itr != _proposals.end())
  {
    msg_itr = _proposals.erase(msg_itr);
  }
}

EOSIO_DISPATCH(eosvoting, (crtproposal)(makevote)(upproposal)(crtargument)(voteargument)(crtnews));
