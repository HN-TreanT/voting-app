import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Vote from "./Vote";
import Admin from "./Admin";
import ElectionContract from "../contracts/Election.json";
import getWeb3 from "../utils/getWeb3";
import { useParams } from "react-router-dom";

export default function Home() {
  const { id } = useParams();
  console.log(id)
  
  const [role, setRole] = useState(2);
  const [web3, setWeb3] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

  // const [accounts, setAccounts] = useState([])
  // accounts.forEach( async item => {
  //   const user = await contract.methods.getRole(item).call();
  //   console.log("check id item: " , item, " role: ", parseInt(user))
    
  // });

  const loadWeb3 = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ElectionContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ElectionContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // if (id === "admin") {
      //   setCurrentAccount(accounts[0]);
      // } else {
      //   await instance.methods.addVoter(id).send({ from: accounts[0] });
      //   setCurrentAccount(id)
      // }

      if (id === "admin" ) {
        setCurrentAccount(accounts[0]);
      }
       else {
        setCurrentAccount(id)
       }
      // setAccounts(accounts)
      setWeb3(web3);
      // setCurrentAccount(accounts[0]);
      setContract(instance);
      console.log("init");
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getRole = async () => {
    if (contract) {
      const user = await contract.methods.getRole(currentAccount).call();
      setRole(parseInt(user));
      console.log("role:");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeb3();
  }, []);

  useEffect(() => {
    getRole();
  }, [contract]);

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        height: "100vh",
      }}
    >
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          Loading...
        </Box>
      ) : (
        <Box>
          {role === 1 && (
            <Admin
              role={role}
              contract={contract}
              web3={web3}
              currentAccount={currentAccount}
            />
          )}

          {role === 2 && (
            <Vote
              role={role}
              contract={contract}
              web3={web3}
              currentAccount={currentAccount}
            />
          )}

          {role === 3 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
              }}
            >
              Unauthorized User
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
