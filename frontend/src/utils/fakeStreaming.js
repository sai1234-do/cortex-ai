export async function fakeStreamingResponse(

    conversationId,

    response,

    appendAssistantChunk,

    finishAssistantResponse

) {

    for (let i = 0; i < response.length; i++) {

        await new Promise((resolve) =>

            setTimeout(resolve, 18)

        );

        appendAssistantChunk(

            conversationId,

            response[i]

        );

    }

    finishAssistantResponse(conversationId);

}