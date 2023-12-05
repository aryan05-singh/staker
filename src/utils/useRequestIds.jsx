import { useContext, useEffect, useState } from 'react';
import Web3Context from '../context/Web3Context';

export const useRequestIds = () => {

    const { selectedAccount, withdrawContract } = useContext(Web3Context);
    const [requestIds, setRequestId] = useState("");
    const [finalizedRequestId , setfinalizedRequestId] = useState(0);
  
    const fetchRequestIds = async () => {
      try {
        const requestIds = await withdrawContract.getRequestIdsByUser(selectedAccount);
        const nextFinalizedId = await withdrawContract.nextRequestIdToFinalize();
        setfinalizedRequestId(parseInt(nextFinalizedId))
        setRequestId(requestIds.toString());
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
  
    const updateRequestIds = async () => {
      if (withdrawContract && selectedAccount) {
        await fetchRequestIds();
      }
    };
  
    useEffect( () => {
      updateRequestIds();
    }, [withdrawContract, selectedAccount]);
  
    return { requestIds, finalizedRequestId ,updateRequestIds };
  };