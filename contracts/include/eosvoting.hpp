#include <eosio/eosio.hpp>
#include <eosio/system.hpp>
#include <eosio/permission.hpp> 
#include "utils.hpp"

using namespace std;
using namespace eosio;
using eosio::public_key;

namespace eosio {
    // ---------------- ADVICE ----------------
    // In Jungle 3, we created an account called genesiseden to simulate official genesis.eden member table on mainnet, so make sure
    // so, please make sure to update genesisdeden to genesis.eden if you are on mainnet
    constexpr name eden_account{"genesisdeden"_n};

    using member_status_type = uint8_t;
    enum member_status : member_status_type {
        pending_membership = 0,
        active_member = 1
    };

    using election_participation_status_type = uint8_t;
    enum election_participation_status : election_participation_status_type {
        not_in_election = 0,
        in_election = 1
    };

    struct member_v0
   {
      eosio::name account;
      std::string name;
      member_status_type status;
      uint64_t nft_template_id;
      // Only reflected in v1
      election_participation_status_type election_participation_status = not_in_election;
      uint8_t election_rank = 0;
      eosio::name representative{uint64_t(-1)};
      std::optional<eosio::public_key> encryption_key;

      uint64_t primary_key() const { return account.value; }
      uint128_t by_representative() const
      {
         return (static_cast<uint128_t>(election_rank) << 64) | representative.value;
      }
    };
    EOSIO_REFLECT(member_v0, account, name, status, nft_template_id);

    // - A member can donate at any time after the end of a scheduled election and before
    //   the start of the next scheduled election.
    // - A member who does not make a donation before the election starts will be deactivated.
    //
    struct member_v1 : member_v0
    {
    };
    EOSIO_REFLECT(member_v1,
                    base member_v0,
                    election_participation_status,
                    election_rank,
                    representative,
                    encryption_key);

    using member_variant = std::variant<member_v0, member_v1>;

    struct member
    {
        member_variant value;
        EDEN_FORWARD_MEMBERS(value,
                            account,
                            name,
                            status,
                            nft_template_id,
                            election_participation_status,
                            election_rank,
                            representative,
                            encryption_key);
        EDEN_FORWARD_FUNCTIONS(value, primary_key, by_representative)
    };
    EOSIO_REFLECT(member, value)
    using member_table_type = eosio::multi_index<"member"_n, member>;

    bool is_eden(name account) {
        member_table_type member_tb(eden_account, 0);
        auto it = member_tb.find(account.value);
        if(it==member_tb.end() || !it->status()) return false;
        else return true;
    }
} // namespace eosio




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
    uint64_t actualVote;
    uint64_t totalVotes;
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

  ACTION crtproposal(name from, string title, string summary, string content, string category, uint64_t voteMargin, std::vector<name> whitelist, time_point_sec expiredAt);
  ACTION upproposal(name from, uint64_t primaryKey, string title, string summary, string content, string category, uint64_t voteMargin, time_point_sec expiredAt);
  ACTION makevote(name from, uint64_t primaryKey, char value);
  ACTION crtargument(name from, uint64_t primaryKey, string title, string content, bool value);
  ACTION voteargument(name from, uint64_t primaryKey, uint64_t argumentKey, char value);
  ACTION crtnews(name from, uint64_t primaryKey, string title, string content);

public:
  time_point_sec current_time_point_sec()
  {
    return time_point_sec(current_time_point());
  }

  TABLE proposals
  {
    uint64_t primaryKey;
    name author;
    string title;
    string summary;
    string content;
    string category;
    uint64_t voteMargin;
    time_point_sec expiredAt;
    time_point_sec createdAt;
    time_point_sec updatedAt;
    arguments arguments;
    news news;
    votes votes;
    std::vector<name> whitelist;
    uint64_t primary_key() const { return primaryKey; }
    uint128_t secondary_key() const { return (uint128_t{author.value}<<64) + uint64_t{primaryKey}; }
    uint128_t third_key() const { return (uint128_t{votes.totalVotes}<<64) + uint64_t{primaryKey}; }
    
  };


  typedef eosio::multi_index<name("proposals"), proposals, 
    indexed_by<name("authors"), const_mem_fun<proposals, uint128_t, &proposals::secondary_key>>,
    indexed_by<name("proposalvote"), const_mem_fun<proposals, uint128_t, &proposals::third_key>>
  > proposals_index;

};
