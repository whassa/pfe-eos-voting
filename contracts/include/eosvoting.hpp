#include <eosio/eosio.hpp>
#include <eosio/system.hpp>

using namespace std;
using namespace eosio;

CONTRACT eosvoting : public contract
{
public:
  using contract::contract;

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

  ACTION crtproposal(name from, string title, string summary, string content, string category, uint64_t voteMargin, string status, time_point_sec expiredAt);
  ACTION upproposal(name from, uint64_t primaryKey, string title, string summary, string content, string category, uint64_t voteMargin, string status, time_point_sec expiredAt);
  ACTION makevote(name from, uint64_t primaryKey, char value);
  ACTION crtargument(name from, uint64_t primaryKey, string title, string content, bool value);
  ACTION voteargument(name from, uint64_t primaryKey, uint64_t argumentPrimaryKey, char value );
  ACTION crtnews(name from, uint64_t primaryKey, string title, string content);
  ACTION upargument(name from, uint64_t primaryKey, string title, string content, bool value);
  ACTION upnews(name from, uint64_t primaryKey, string title, string content);
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
    uint64_t primary_key() const { return primaryKey; }
  };
  typedef multi_index<name("proposals"), proposals> proposals_index;
};
