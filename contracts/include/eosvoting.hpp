#include <eosio/eosio.hpp>

using namespace std;
using namespace eosio;

CONTRACT eosvoting : public contract {
  public:
    using contract::contract;

    ACTION vote(name from);
    ACTION clear();

  public:
    TABLE votes {
      name    user;
      int  votes;
      auto primary_key() const { return user.value; }
    };
    typedef multi_index<name("votes"), votes> votes_table;
};
