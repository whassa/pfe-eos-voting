#include <eosio/eosio.hpp>
#include <eosio/system.hpp>

using namespace std;
using namespace eosio;

CONTRACT eosvoting : public contract {
  public:
    using contract::contract;

     struct author {
        string userName;
        string publicKey;
    };

    struct singleNews {
      string title;
      string content;
      time_point_sec createdAt;
      time_point_sec updatedAt;
    };


    // vote value if 1 = yes, -1 = no, 0 =  abstain
    struct vote {
      time_point_sec createdAt;
      time_point_sec updatedAt;
      string publicKey;
      char value;
    };

    struct news {
      std::vector<singleNews> singleNews;
    };

    struct votes {
      int actualVote;
      int totalVotes;
      std::vector<vote> vote;
    };

    struct argument {
      string title;
      string content;
      author author;
      time_point_sec createdAt;
      time_point_sec updatedAt;
      votes votes;
      bool value;
    };

    struct arguments {
      std::vector<argument> argument;
    };

    ACTION crtproposal(name from, uint64_t primaryKey, string title, string summary, string content, string category, string status, author author, time_point_sec expiredAt );
    ACTION makevote(name from, uint64_t primaryKey, string publicKey, char value);
    ACTION clear();

    public:
    
    time_point_sec current_time_point_sec() {
      return time_point_sec(current_time_point());
    }
    
    TABLE proposals {
      uint64_t primaryKey;
      string title;
      string summary; 
      string content;
      string category;
      string status;
      time_point_sec expiredAt;
      time_point_sec createdAt;
      time_point_sec updatedAt;
      time_point_sec deletedAt;
      bool integrity;
      author author;
      news news;
      votes votes;
      uint64_t primary_key() const { return primaryKey; }
    };
    typedef multi_index<name("proposals"), proposals> proposals_table;
};
