const fetchDB = (sublink: string, method: string, body: object) => {
    fetch(`http://localhost:3000/${sublink}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .catch((error) => console.error('Error:', error));
  }

export const changeStat = (healthDiff: number, strengthDiff: number) => {
    const object = {
        health: healthDiff,
        strength: strengthDiff,
    }
  
    fetchDB("stats", "PUT", object);
}

changeStat(10, 5);