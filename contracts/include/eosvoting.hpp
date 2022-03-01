#include <eosio/eosio.hpp>

using namespace std;
using namespace eosio;

CONTRACT eosvoting : public contract {
  public:
    using contract::contract;

     struct author {
        string userName;
        string publicKey;
    };

    struct argument {
      string title;
      string content;
      author author;
      uint64_t createdAt;
      uint64_t updatedAt;
      bool value;
    };

    struct singleNews {
      string title;
      string content;
      uint64_t createdAt;
      uint64_t updatedAt;
    };


    // vote value if 1 = yes, -1 = no, 0 =  abstain
    struct vote {
      uint64_t createdAt;
      uint64_t updatedAt;
      string publicKey;
      char value;
    };


    struct arguments {
      std::vector<argument> argument;
    };

    struct news {
      std::vector<singleNews> singleNews;
    };

    struct votes {
      int actualVote;
      int totalVotes;
      std::vector<vote> vote;
    };

    ACTION crtproposal(name from, uint64_t primaryKey, string title, string summary, string content, string category, string status, author author );
    ACTION makevote(name from, uint64_t primaryKey, string publicKey, char value);
    ACTION clear();

    public:
    
    
    TABLE proposals {
      uint64_t primaryKey;
      string title;
      string summary; 
      string content;
      string category;
      string status;
      uint64_t createdAt;
      uint64_t updatedAt;
      uint64_t deletedAt;
      bool integrity;
      author author;
      news news;
      votes votes;
      uint64_t primary_key() const { return primaryKey; }
    };
    typedef multi_index<name("proposals"), proposals> proposals_table;
};
