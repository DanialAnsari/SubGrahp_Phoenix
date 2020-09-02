import { BigInt,BigDecimal } from "@graphprotocol/graph-ts"
import {
  Contract,
  Approval,
  Burn,
  OwnershipTransferred,
  Transfer
} from "../generated/Contract/Contract"
import { user } from "../generated/schema"

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  
  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.allowance(...)
  // - contract.allowed(...)
  // - contract.approve(...)
  // - contract.approveAndCall(...)
  // - contract.balanceOf(...)
  // - contract.balances(...)
  // - contract.decimals(...)
  // - contract.initialOwner(...)
  // - contract.name(...)
  // - contract.owner(...)
  // - contract.phoenixAuthAddress(...)
  // - contract.symbol(...)
  // - contract.totalSupply(...)
  // - contract.transfer(...)
  // - contract.transferFrom(...)
}

export function handleBurn(event: Burn): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {


}

let owner="0xb23d254dbd37f5fddd2a707794bf97783c821d12";
let firstTime=true;
export function handleTransfer(event: Transfer): void {
  let account1=user.load(event.params._from.toHex())

  if(account1==null){
    account1=new user(event.params._from.toHex());
    account1.balance=BigDecimal.fromString("0");
  }
  
  let account2=user.load(event.params._to.toHex())

  if(account2==null){
    account2=new user(event.params._to.toHex());
    account2.balance=BigDecimal.fromString("0");
  }

  let ownerAccount=user.load(owner);


  account1.balance=account1.balance.minus(BigDecimal.fromString(event.params._amount.toString()))
  account2.balance=account2.balance.plus(BigDecimal.fromString(event.params._amount.toString()))


  if(event.transaction.hash.toHexString()=="0xff8a46ec40a02cfa1fc0b484855369ced2016e8ca897847eab6c0cf74d50c1e2"){
    
    account1.hash=event.transaction.hash.toHexString()
    account1.balance=account1.balance.plus(BigDecimal.fromString("110000000000000000000000000"));
  }
  




  account1.save();
  account2.save();
  
}
