#include <eosio/eosio.hpp>

using namespace std;
using namespace eosio;

CONTRACT eosvoting : public contract {
  public:
    using contract::contract;

    ACTION crtproposal(name from, uint64_t primaryKey, string title, string summary, string content, string category, string status);

    struct author {
        string userName;
        uint64_t publicKey;
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

    struct vote {
      uint64_t createdAt;
      uint64_t updatedAt;
      string publicKey;
      bool value;
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
