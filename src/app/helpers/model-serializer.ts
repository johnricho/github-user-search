
/**
 * a dynamic interface for deserializing json object to model
 *
 * @method deserialize
 */
export interface Serializer<T> {

  /**
   * handle pagination page changed event
   *
   * @param data
   */
    deserialize(data : Object) : T;
}
