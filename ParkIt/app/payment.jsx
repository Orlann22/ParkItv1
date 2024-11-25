import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';

export default function PaymentScreen() {
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateInvoice = async () => {
    try {
      const response = await fetch('http://192.168.82.231:3000/create-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          payerEmail: email,
          description,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Display the invoice URL to the user
        Alert.alert('Invoice Created', `Pay here: ${data.invoice_url}`);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <View className="flex-1 w-full h-full bg-black justify-center items-center p-4">
      <View className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
        {/* Amount */}
        <View className="mb-4">
          <Text className="text-lg text-gray-700">Amount</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter amount"
            keyboardType="numeric"
            className="mt-2 p-3 border border-gray-300 rounded-md"
          />
        </View>

        {/* Payer Email */}
        <View className="mb-4">
          <Text className="text-lg text-gray-700">Payer Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            keyboardType="email-address"
            className="mt-2 p-3 border border-gray-300 rounded-md"
          />
        </View>

        {/* Description */}
        <View className="mb-4">
          <Text className="text-lg text-gray-700">Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            className="mt-2 p-3 border border-gray-300 rounded-md"
          />
        </View>

        {/* Create Invoice Button */}
        <TouchableOpacity
          onPress={handleCreateInvoice}
          className="bg-blue-500 py-3 rounded-md items-center"
        >
          <Text className="text-white text-lg">Create Invoice</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
