export default {
    async contactCoach(context, payload){
        const newRequest= {
            coachId:payload.coachId,
            userEmail: payload.email,
            message: payload.message
        }
        const response = await fetch(`firebase.url/requests/${payload.coachId}.json` ,{
            method: 'POST',
            body: JSON.stringify(newRequest)
        })
        const responseData = await response.json();
        newRequest.id = responseData.name;
        context.commit('addRequest', newRequest)
    },
    async fetchRequests(context){
        const coachId = context.rootGetters.userId
        const token = context.rootGetters.token
        const response = await fetch(`firebase.url/requests/${coachId}.json?auth=${token}`)
        const responseData= await response.json()

        const requests =[]

        for(const key in responseData){
            const request={
                id: key,
                coachId: coachId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message,
            }
            requests.push(request)

        }
        context.commit('setRequests', requests)


    }
}