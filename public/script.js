const contractAddress = sessionStorage.getItem("contractAddress") || "";
sessionStorage.setItem(
  "contractAddress",
  "0xF12a3FeFe7e969079E04A2fAe46dc9708900b869"
);
/////////////////////////////////////////////////
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const contract = new web3.eth.Contract(abi, contractAddress);

//insaccount////////////////////////////////////
const insaccount = sessionStorage.getItem("insaccount") || "";
sessionStorage.setItem(
  "insaccount",
  "0xC34DD154d78Bf5D8d2530e8bf43dE4c9eA2c3e3d"
);
//hopaccount////////////////////////////////////
const hopaccount = sessionStorage.getItem("hopaccount") || "";
sessionStorage.setItem(
  "hopaccount",
  "0xFEe9b306a7b97570E9E96B4991B2df245b85e241"
);
//////////////////////////////////////////////////////
//Company
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//Company registration
//////////////////////////////////////////////////////
async function registerCompany() {
  console.log("Connected to MetaMask!");
  console.log("User Address:", insaccount);
  const Companyname = document.getElementById("name-company").value;
  const Companypassword = document.getElementById("password-company").value;
  const Companyregnum = document.getElementById("regnum-company").value;
  try {
    const result = await contract.methods
      .addInsuranceCompany(
        Companyname,
        insaccount,
        Companyregnum,
        Companypassword
      )
      .send({ from: insaccount, gas: "500000" });
    console.log("Transaction hash:", result.transactionHash);
    alert("Registration successful");
    window.location.href = "/insuCompany";
  } catch (error) {
    console.error(error);
  }
}
//////////////////////////////////////////////////////
//Company login
//////////////////////////////////////////////////////

async function insuranceCompanyLogin() {
  try {
    const passwordlogin = document.getElementById(
      "passwordlogin-company"
    ).value;
    const result = await contract.methods
      .InsuranceCompanyLogin(insaccount, passwordlogin)
      .call();
    console.log("Login result:", result);
    if (result === "0") {
      console.log("Insurance company is not registered.");
      alert("Insurance company is not registered.");
    } else if (result === "1") {
      console.log("Login successful.");
      alert("Login successful.");
      window.location.href = "/insuCompany";
    } else if (result === "2") {
      console.log("Incorrect password.");
      alert("Incorrect password.");
    } else {
      console.log("Unknown result:", result);
    }
  } catch (error) {
    console.error(error);
  }
}

const SignupButton_comp = document.getElementById("SignupButton-company");
SignupButton_comp.onclick = registerCompany;

const LoginButton_comp = document.getElementById("LoginButton-company");
LoginButton_comp.onclick = insuranceCompanyLogin;

//////////////////////////////////////////////////////
//Customer
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//Customer registration
//////////////////////////////////////////////////////
async function registerCustomer() {
  const Customername = document.getElementById("name-cust").value;
  const Customerpassword = document.getElementById("password-cust").value;
  await window.ethereum.enable();
  try {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    const result = await contract.methods
      .registerasacustomer(Customername, accounts[0], Customerpassword)
      .send({ from: accounts[0], gas: "2000000" }); // Adjust the gas limit as needed
    // const data = await contract.methods.getAddress().call();
    // console.log(data);
    console.log("Transaction hash:", result.transactionHash);
    alert("Registration successful");
    window.location.href = "/customer";
  } catch (error) {
    console.error(error);
  }
}

const SignupButton_cust = document.getElementById("SignupButton-cust");
SignupButton_cust.onclick = registerCustomer;

//////////////////////////////////////////////////////
//Customer registration
//////////////////////////////////////////////////////

async function customerlogin() {
  try {
    // const insaccounts = await web3.eth.insgetaccounts();
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts(); 
    const passwordlogin = document.getElementById(
      "passwordlogin-cust"
    ).value;

    const result = await contract.methods
      .CustomerLogin(accounts[0], passwordlogin)
      .call();

    console.log("Login result:", result);

    if (result === "0") {
      console.log("Customer  is not registered.");
      alert("Customer is not registered.");
    } else if (result === "1") {
      console.log("Login successful.");
      alert("Login successful.");
      window.location.href = "/customer";
    } else if (result === "2") {
      console.log("Incorrect password.");
      alert("Incorrect password.");
    } else {
      console.log("Unknown result:", result);
    }
  } catch (error) {
    console.error(error);
  }
}

const LoginButton = document.getElementById("LoginButton-cust");
 LoginButton.onclick = customerlogin;

//////////////////////////////////////////////////////
//Hospital
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//Hospital registration
//////////////////////////////////////////////////////
async function registerHospital() {
  const Hospitalname = document.getElementById("name-hop").value;
  const Hospitalpassword = document.getElementById("password-hop").value;
  const HospitalregNum = document.getElementById("regnum-hop").value;
  try {
    const result = await contract.methods
      .registerhospital(
        Hospitalname,
        HospitalregNum,
        hopaccount,
        Hospitalpassword
      )
      .send({ from: hopaccount, gas: "500000" });
    console.log("Transaction hash:", result.transactionHash);
    alert("Registration successful");
    window.location.href = "/hospital";
  } catch (error) {
    console.error(error);
  }
}

const SignupButton_hop = document.getElementById("SignupButton-hop");
SignupButton_hop.onclick = registerHospital;
//////////////////////////////////////////////////////
//Hospital Login
//////////////////////////////////////////////////////
async function hospitallogin() {
  try {
    // const insaccounts = await web3.eth.insgetaccounts();
    const passwordlogin = document.getElementById(
      "passwordlogin-hop"
    ).value;

    const result = await contract.methods
      .HospitalLogin(hopaccount, passwordlogin)
      .call();

    console.log("Login result:", result);

    if (result === "0") {
      console.log("Hospital is not registered.");
      alert("Hospital is not registered.");
    } else if (result === "1") {
      console.log("Login successful.");
      alert("Login successful.");
      window.location.href = "/hospital";
    } else if (result === "2") {
      console.log("Incorrect password.");
      alert("Incorrect password.");
    } else {
      console.log("Unknown result:", result);
    }
  } catch (error) {
    console.error(error);
  }
}

 const LoginButton_hop = document.getElementById("LoginButton-hop");
 LoginButton_hop.onclick = hospitallogin;
