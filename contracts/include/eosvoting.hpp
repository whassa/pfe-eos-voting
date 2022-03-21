#include <eosio/eosio.hpp>
#include <eosio/system.hpp>

using namespace std;
using namespace eosio;

CONTRACT eosvoting : public contract
{
public:
  using contract::contract;

  bool checkwhitelist(std::vector<name> whitelist, name from, name owner){
    if ( from == owner ) {
      return 1;
    }
    if (whitelist.size() >= 1)
    {
      for (size_t i = 0; i < whitelist.size(); i++)
      {
        if ( whitelist[i] == from)
        {
          return 1;
        }
      }
      return 0;
    } 
    return 1;
  };

  struct singlenews
  {
    string title;
    string content;
    time_point_sec createdAt;
    time_point_sec updatedAt;
  };

  // vote value if 1 = yes, -1 = no, 0 =  abstain
  struct vote
  {
    time_point_sec createdAt;
    time_point_sec updatedAt;
    name user;
    char value;
  };

  struct news
  {
    std::vector<singlenews> singlenews;
  };

  struct votes
  {
    int actualVote;
    int totalVotes;
    std::vector<vote> vote;
  };

  struct argument
  {
    uint64_t primaryKey;
    string title;
    string content;
    name author;
    time_point_sec createdAt;
    time_point_sec updatedAt;
    votes votes;
    bool value;
  };

  struct arguments
  {
    std::vector<argument> argument;
  };

  ACTION crtproposal(name from, string title, string summary, string content, string category, uint64_t voteMargin, string status, std::vector<name> whitelist, time_point_sec expiredAt);
  ACTION upproposal(name from, uint64_t primaryKey, string title, string summary, string content, string category, uint64_t voteMargin, string status, time_point_sec expiredAt);
  ACTION makevote(name from, uint64_t primaryKey, char value);
  ACTION crtargument(name from, uint64_t primaryKey, string title, string content, bool value);
  ACTION voteargument(name from, uint64_t primaryKey, uint64_t argumentKey, char value);
  ACTION crtnews(name from, uint64_t primaryKey, string title, string content);
  ACTION clear();

public:
  time_point_sec current_time_point_sec()
  {
    return time_point_sec(current_time_point());
  }

  TABLE proposals
  {
    uint64_t primaryKey;
    string title;
    string summary;
    string content;
    string category;
    uint64_t voteMargin;
    string status;
    time_point_sec expiredAt;
    time_point_sec createdAt;
    time_point_sec updatedAt;
    time_point_sec deletedAt;
    name author;
    arguments arguments;
    news news;
    votes votes;
    std::vector<name> whitelist;
    uint64_t primary_key() const { return primaryKey; }
  };
  typedef multi_index<name("proposals"), proposals> proposals_index;
};
