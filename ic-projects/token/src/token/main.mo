import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";


actor Token {
    var owner : Principal = Principal.fromText("rudjr-gzpiv-rgytt-6qbg4-iofv6-vscxx-hdtll-sjq5b-l2q54-dc3gb-2ae");
    var totalSupply : Nat = 100000000000;
    var symbol : Text = "PANG";

    private stable var balanceEntries : [(Principal, Nat)] = [];

    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    if (balances.size() < 1) {
        balances.put(owner, totalSupply);
    };

    public query func balanceOf(who: Principal) : async Nat {
        let balance : Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };
        return balance;
    };

    public query func getSymbol() : async Text {
        return symbol;
    };

    public shared(msg) func payOut() : async Text {
        Debug.print(debug_show(msg.caller));
        if (balances.get(msg.caller) == null) {
            let amount = 100000000;
            let a = await transfer(msg.caller, amount);
            let result = Nat.toText(amount);
            return "Claimed $" # result;
        } else {
            return "Already Claimed";
        };
    };

    public shared(msg) func transfer(toWho: Principal, amount: Nat) : async Text {
        if (msg.caller == toWho) {
            return "Can't transfer to the same account";
        };
        let fromBalance = await balanceOf(msg.caller);
        let toBalance   = await balanceOf(toWho);
        if (fromBalance > amount) {
            balances.put(msg.caller, fromBalance - amount);
             balances.put(toWho, toBalance + amount);
            return "Success";
        } else {
            return "Insufficient Funds";
        };
    };
    
    system func preupgrade() {
        balanceEntries := Iter.toArray(balances.entries());

    };

    system func postupgrade() {
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        if (balances.size() < 1) {
                balances.put(owner, totalSupply);
        };
    };

}